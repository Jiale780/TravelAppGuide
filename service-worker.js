/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
"use strict";

self.addEventListener("install", function(event) {
  console.log("Service Worker installing.");

  event.waitUntil(
    caches
      .open("app-v1") //identifies the VERSION of cache to store the files into

      .then(function(cache) {
        return cache.addAll(
          // addAll() accepts an array of file-paths which you want to store into the offline cache
          [
            "/offline.html",
            "/index.html",
            "/InfoDetails.html",
            "/ExtraNotes.html"
          ]
        );
      })
      .then(self.skipWaiting())
  );
});

  self.addEventListener("activate", function(event) {
    console.log("Service Worker activating.");
  });

self.addEventListener("fetch", function(event) {
  console.log("Fetch:", event.request.url);
  event.respondWith(
    caches
      .match(event.request) //check if the fetch request URL matches with the stored cache

      .then(function(response) {
        return response || fetch(event.request); //load cache response if found, if not fetch from network as per normal
      })
  );
});
