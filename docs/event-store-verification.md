# Persoon Event Store Verification

Use this checklist after changing the local event store:

1. Run `npm run lint`.
2. Start the app with `npm run dev`.
3. Open the main page and confirm the browser does not throw `The result of getServerSnapshot should be cached to avoid an infinite loop`.
4. Refresh the page and confirm the Event Log still shows previously tracked events from `localStorage`.
5. Click the main CTA and confirm a new `cta_click` appears at the top of the log.
6. Switch personas and confirm `feature_exposed` appears when the recommended feature set changes, but does not spam duplicates on idle re-renders.
7. Click `Clear events` and confirm the log empties and stays empty after refresh.

Store invariants to preserve:

- `getPersoonEventsServerSnapshot()` must always return the same `EMPTY_EVENTS` reference.
- `getPersoonEventsSnapshot()` must return the same array instance until `trackPersoonEvent()` or `clearPersoonEvents()` changes the cache.
- The cache should hydrate from `localStorage` once on the client, then remain module-backed.
- `subscribeToPersoonEvents()` must stay stable and live outside React hooks.
