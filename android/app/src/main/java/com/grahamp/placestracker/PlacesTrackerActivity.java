package com.grahamp.placestracker;

import android.app.Activity;
import android.app.AlertDialog;
import android.graphics.Color;
import android.os.Bundle;
import android.content.DialogInterface;
import android.view.Gravity;
import android.view.View;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public final class PlacesTrackerActivity extends Activity {
    private static final String PREFERENCES = "places_server";
    private static final String SERVER_KEY = "server_base_url";
    private WebView webView;
    private TextView status;

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        buildInterface();
        configureWebView();
        loadPlaces();
    }

    private void buildInterface() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.rgb(245, 247, 251));

        LinearLayout toolbar = new LinearLayout(this);
        toolbar.setGravity(Gravity.CENTER_VERTICAL);
        toolbar.setPadding(dp(14), dp(7), dp(8), dp(7));
        toolbar.setBackgroundColor(Color.rgb(23, 49, 92));

        LinearLayout titles = new LinearLayout(this);
        titles.setOrientation(LinearLayout.VERTICAL);
        TextView title = new TextView(this);
        title.setText("Places Tracker");
        title.setTextColor(Color.WHITE);
        title.setTextSize(18);
        status = new TextView(this);
        status.setText("Connecting to your Mac…");
        status.setTextColor(Color.rgb(200, 216, 239));
        status.setTextSize(11);
        titles.addView(title);
        titles.addView(status);
        toolbar.addView(titles, new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1));
        toolbar.addView(toolbarButton("Reload", new View.OnClickListener() {
            @Override public void onClick(View view) { loadPlaces(); }
        }));
        toolbar.addView(toolbarButton("Mac", new View.OnClickListener() {
            @Override public void onClick(View view) { showServerDialog(); }
        }));

        webView = new WebView(this);
        root.addView(toolbar, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
        root.addView(webView, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 0, 1));
        setContentView(root);
    }

    private Button toolbarButton(String label, View.OnClickListener listener) {
        Button button = new Button(this);
        button.setText(label);
        button.setTextColor(Color.WHITE);
        button.setTextSize(12);
        button.setAllCaps(false);
        button.setBackgroundColor(Color.TRANSPARENT);
        button.setOnClickListener(listener);
        return button;
    }

    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setGeolocationEnabled(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setBuiltInZoomControls(false);
        WebView.setWebContentsDebuggingEnabled(false);
        webView.setWebViewClient(new WebViewClient() {
            @Override public void onPageFinished(WebView view, String url) {
                status.setText("Connected · changes save on your Mac");
            }

            @Override public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()) status.setText("Mac unavailable · start the server and retry");
            }

            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return !sameServer(request.getUrl().toString());
            }
        });
    }

    private String serverBaseUrl() {
        return getSharedPreferences(PREFERENCES, MODE_PRIVATE).getString(SERVER_KEY, ServerConfig.DEFAULT_SERVER_BASE_URL);
    }

    private String viewerUrl() {
        return trimTrailingSlash(serverBaseUrl()) + "/timeline.html?server=1&token=" + URLEncoder.encode(ServerConfig.ACCESS_TOKEN, StandardCharsets.UTF_8);
    }

    private void loadPlaces() {
        status.setText("Connecting to your Mac…");
        webView.loadUrl(viewerUrl());
    }

    private boolean sameServer(String candidate) {
        try {
            URI allowed = URI.create(serverBaseUrl());
            URI requested = URI.create(candidate);
            return allowed.getScheme().equalsIgnoreCase(requested.getScheme()) && allowed.getHost().equalsIgnoreCase(requested.getHost()) && effectivePort(allowed) == effectivePort(requested);
        } catch (RuntimeException exception) {
            return false;
        }
    }

    private static int effectivePort(URI uri) {
        if (uri.getPort() >= 0) return uri.getPort();
        return "https".equalsIgnoreCase(uri.getScheme()) ? 443 : 80;
    }

    private void showServerDialog() {
        EditText input = new EditText(this);
        input.setSingleLine(true);
        input.setText(serverBaseUrl());
        input.setSelectAllOnFocus(true);
        int padding = dp(20);
        LinearLayout wrapper = new LinearLayout(this);
        wrapper.setPadding(padding, dp(8), padding, 0);
        wrapper.addView(input, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
        new AlertDialog.Builder(this)
            .setTitle("Mac server address")
            .setMessage("Use the Mac’s Tailscale name or IP. The app does not collect location or run in the background.")
            .setView(wrapper)
            .setNegativeButton("Cancel", null)
            .setPositiveButton("Connect", new DialogInterface.OnClickListener() {
                @Override public void onClick(DialogInterface dialog, int which) { saveServerAndConnect(input.getText().toString()); }
            })
            .show();
    }

    private void saveServerAndConnect(String input) {
        String value = trimTrailingSlash(input.trim());
        if (value.startsWith("http://") || value.startsWith("https://")) {
            getSharedPreferences(PREFERENCES, MODE_PRIVATE).edit().putString(SERVER_KEY, value).apply();
            loadPlaces();
        }
    }

    private static String trimTrailingSlash(String value) {
        while (value.endsWith("/")) value = value.substring(0, value.length() - 1);
        return value;
    }

    private int dp(int value) { return Math.round(value * getResources().getDisplayMetrics().density); }

    @Override public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    @Override protected void onDestroy() {
        if (webView != null) webView.destroy();
        super.onDestroy();
    }
}
