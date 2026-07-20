# Google Maps Timeline Viewer
Google announced in 2024 that they would begin storing your Timeline data (ie your Location History) locally on your device, rather than in the cloud on their systems. The desktop version of their timeline viewer was also discontinued, since the data is now on your phone.

If you're like me, you have years worth of timeline data that you want to be able to view. This project enables that. It supports the old data format from Google Takeout, as well as the new on-device data format (which you can export from your device to your computer).

### Features:
- Supports both Google Takeout data and On-Device data file (Android or iOS)
- Timeline and map view
- Place info and icons
- Duration of visits ; distance traveled (in km or miles)
- Travel modes color-coded ; direction of travel arrows when clicking a path
- View multiple days at once
- Search by place name to find dates with visits
- Find all visited places within the viewable map area
- Summary of activities by year/month
- Timeline items are editable, including route paths
- Timezone setting for viewing your travel days with local times
- Toggle layers on and off, eg to view only places, without travel paths
- Place details retrieved from Google Places API can be saved locally, to reduce future API calls
- World view shows all of the countries and cities you've visited
- Export to KML file
- Mobile-friendly UI, so you can use this on your phone
- Detailed place profiles with percentile distributions, journey context, data-quality evidence, and reversible correction tools
- Selected-day intelligence, historical comparisons, event feed, and interactive movement replay
- Automatic place discovery with locally persisted accept, merge, and ignore decisions
- Journey and walking analytics, cautious public-transport inference, and side-by-side comparisons
- Visit annotations, bulk tagging, spending and context fields, plus reusable automatic rules
- Routine and anomaly analysis with numerical explanations and historical examples
- Compound search across time, place, movement, annotations, confidence, revisit intervals, and geographic areas
- Local-first background analytics with visible progress, cancellation, and versioned IndexedDB caching

The analytical workspace uses only imported Timeline data. By default it uses local browser storage; the optional foreground Mac server described below gives the Android app one shared, Git-backed data store. It does not add live tracking, background collection, sharing, crash detection, alerts, accounts, or subscriptions.

<p align="center">
  <a href="/screenshot.png"><img src="/screenshot.png?raw=true" alt="Map View" width="48%"></a>
  <a href="/screenshot2.png"><img src="/screenshot2.png?raw=true" alt="Summary View" width="48%"></a>
</p>

<p align="center">
  <a href="/screenshot3.png"><img src="/screenshot3.png?raw=true" alt="Area Search" width="48%"></a>
  <a href="/screenshot4.png"><img src="/screenshot4.png?raw=true" alt="World View" width="48%"></a>
</p>

#

Setup procedure:

## Get Your Data: Option 1, On-Device data export
1. For Android: Open the Settings app, tap "Location", then "Location services", then "Timeline" and then "Export Timeline data".   
   For iOS: Open the Google Maps app, tap your profile picture, select "Settings" and then "Location & Privacy". Tap "Export Timeline data".
2. Save the exported file as "Timeline.json". (On non-English devices, the default file name may be different -- be sure to save the file as "Timeline.json")
3. Transfer the JSON file to your computer, and save it anywhere you like, eg My Documents.

   
## Get Your Data: Option 2, Google Takeout (No longer available once you've started using on-device data)
1. **Go to Google Takeout:**
    - Visit [Google Takeout](https://takeout.google.com/).

2. **Select Data to Include:**
    - Click "Deselect all".
    - Scroll down and select **Timeline**. (The default format is JSON, which is what we want.)
    - Click "Next step".

3. **Customize Export Format:**
    - Choose the delivery method, etc. Doesn't matter what you choose here.
    - Click "Create export".

4. **Download the Export:**
    - Once the export is ready, download the file.
    - Extract the archive to anywhere you like, eg My Documents.
    - Ensure that the archive contained a folder called "Location History (Timeline)". If not, you'll need to use on-device data, as described above. (Note that "Timeline Edits.json" is *not* the same as the "Timeline.json" that comes from your device.)
  

## Obtain a Google Maps API Key (Optional)

You can now open the viewer and load timeline data without adding an API key.
Without one, Google Maps rendering, area search, world view, and live Google place lookups stay disabled, and some places may remain "Unknown Location" unless that data already exists in your export or cache.

1. **Go to the Google Cloud Console:**
    - Visit [Google Cloud Console](https://console.cloud.google.com/).

2. **Create a New Project:**
    - Click on the project drop-down and select "New Project".
    - Enter a name for your project and click "Create".

3. **Enable APIs:**
    - In the Cloud Console, go to **APIs & Services**.
    - Search for the following APIs and enable them:
        - **Maps JavaScript API**
        - **Maps Embed API**
        - **Places API (New)**
    - You'll need to enable Billing to use the APIs. With normal use, you shouldn't incur any charges. See bottom of this doc for more info.

4. **Create API Key:**
    - Go to **APIs & Services > Credentials**.
    - Click "Create Credentials" and select "API Key".
    - Copy the generated API key.

5. **Restrict API Key (Optional):**
    - In the API key's settings, under **API restrictions**, select "Restrict key" and choose the APIs you enabled.


##  Final Set Up
1. **Download The Google Maps Timeline Viewer:**
    - Download or clone the complete repository so that `timeline.html` and the `assets` folder remain together. The analytics code and background worker are stored in `assets/places-analytics.js` and `assets/analytics-worker.js`.
    - For full worker support, serve the folder locally rather than opening only a copied HTML file. For example, run `python3 -m http.server 8765` in the repository folder and open `http://localhost:8765/timeline.html`.
   
4. **Optional: Add your API key:**
   - Open the timeline.html file in a text editor and find the code below, near the top:
     ```html
     <script>
		  window.GOOGLE_MAPS_API_KEY = "YOUR_API_KEY"; // Replace YOUR_API_KEY with your actual key
     ```
   - Replace `YOUR_API_KEY` with the key you obtained from the Google Cloud Console, and save.
   - If you skip this step, the app still works for local timeline loading and non-map views.


## View Your Timeline
1. **Open the timeline.html File:**
    - Open the file on your computer or mobile device. Supported browsers include Chrome and Microsoft Edge. Firefox will unfortunately not work.
    - At the top left of the page, click Load Data and navigate to the folder that contains your Timeline data.
        - For Google Takeout data: The folder structure should be "Takeout\Location History (Timeline)\Semantic Location History". Once you are within the "Semantic Location History" folder, and see subfolders for each year, click "Select Folder" on the dialog. (Do not navigate into one of the year folders.)
        - For On-Device exported data: Simply choose the folder that contains your exported Timeline.json file.
    - Note that on Android you may not be allowed to load the data if it's in certain folders, such as Downloads -- move the data file to an accessible location.
    - Once data are loaded, choose **Analyse** to open the continuously scrollable intelligence workspace. All corrections, annotations, suggestion decisions, and derived caches stay in local browser storage.

## Android app with your Mac as the server

The native Android app is a foreground-only WebView client for the same responsive viewer. It requests no location permission and declares no service, receiver, scheduled worker, or background task. Your Mac reads the imported Timeline and owns the shared annotations, rules, place corrections, suggestion decisions, analytics cache, and legacy Timeline edits.

1. Keep Tailscale connected on the Mac and phone.
2. On the Mac, run `npm run server:start`. This command stays in the Terminal foreground and stops with Control-C.
3. Build and install with `npm run android:install`. If no phone is connected, the signed APK remains at `build/android/PlacesTrackerAndroid-debug.apk` and is available while the server is running at `http://grahams-macbook-air.tailcc5a23.ts:8787/android/latest.apk`.
4. Open Places Tracker on Android. Its default server is `http://grahams-macbook-air.tailcc5a23.ts:8787`; the **Mac** button lets you change that address.

The first build creates a private `.places-server-token`, embeds it in the APK, and keeps it out of Git. API requests require this token, and the server exposes only the viewer assets and APK—not the raw Timeline file. Each saved mutation is written atomically to `data/places-server-state.json` and committed by itself to the local Git repository. Set `PLACES_GIT_PUSH=1` only if you also want every server mutation pushed automatically.

The server currently defaults to `combined_location_history_dedupe_work/staging/unique_data_files/0016_Timeline.json`. Point it at a different import with `PLACES_TIMELINE_PATH=/absolute/path/to/Timeline.json npm run server:start`.

## Development and verification

The new analytics modules are TypeScript and remain separate from rendering code. To verify a checkout:

```sh
npm install
npm run check
npm test
npm run build
```

The build produces both browser bundles in `assets/`. See [docs/architecture.md](docs/architecture.md) for the canonical model, correction log, worker, caching, and local-data boundaries.

## Note on API Usage & Billing
- You can find the free usage limits, and over-the-limit pricing here: https://developers.google.com/maps/billing-and-pricing/pricing#places-pricing
- Depending on what information is requested during the API call, it will fall into tiers, eg Essentials or Pro. Details here:
  https://developers.google.com/maps/billing-and-pricing/sku-details#place-details-pro-sku
- At this time, the monthly free limits are 1,000 Place Photos, 5,000 Pro-level requests, and 10,000 Essentials-level requests.
- There is also an option within the Timeline Viewer to disable API calls, which will still show your activity paths and place visits, however all of the places will be labeled "Unknown Location".
- You can also save retrieved Place data to a file, which will be loaded automatically next time, to avoid API calls that were done previously.
  
