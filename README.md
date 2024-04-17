# BoldVoice Take Home

# Want to run the app? Locally?
The app has an /app folder and a /server folder.
CD into /app and run npm run start -- the expo app runs on port 8081.
CD into /server and run npm run start -- the server runs on port 4000.

The app's been tested on web and Android; for testing with Android, you'll need to switch 'localhost' in line 31 of SearchBar.tsx to the ip address of the network your phone is connected to (if you want to scan with Expo).

Things to note:
- When running on web, the assumption is the device toolbar will be used with a screen width of 375 and a height of 812 (as in the Figma file).
- The font provided was for iOS only. Since I didn't have an iOS machine, I did some googling and saw SF Pro was originally based off Helvetica. So, the font is in Helvetica. Hopefully it's not too off!
- Similarly, for the same reason, it hasn't been tested on an iPhone. Sorry 🙏🙏🙏
- I added a loading indicator for when the data is fetching.
- I also added an error message for if the data isn't able to be fetched, just so the user isn't left wondering.
- The mockup includes a number of languages for the 'languages' section of the result screen, when you click into a repo. However, in both the GitHub schema and the responses I scanned, it seems like the language is just a string, so I've only included the one that was provided.
- Currently, the search only triggers if three characters have been input, and it's on a 500 ms debounce.
- For the searchbar, the Figma file includes a little X to clear results. I don't have an X in mine, but according to the RN docs, the clearButtonMode="while-editing" prop on TextInput will pop up the little X on iOS while editing. I have not been able to confirm this personally, though.

Changes 4/16/24:
- The header now moves up when the list is scrolled down
- The text matching in the search screen now carries over into the results screen when clicked into
- The linear gradient has been tweaked to be more faithful to the original design
- I saw GitHub wasn't capitalized, now it is
- The results cards previously had a min-height of 100, now no min-height (as in design)
- When there's no description on a repo, I put in 'No description available.'
- I put in the clear search query 'X' button on the search bar for non-iOS devices
- I still couldn't get SF Pro working on my Windows machine, but I used Inter instead, which a little googling told me was the closest equivalent
- I made a separate API call in the results screen to get a full list of the languages used in each repo
