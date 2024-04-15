# BoldVoice Take Home

# Want to run the app? Locally?
The app has an /app folder and a /server folder.
CD into /app and run npm run start -- the expo app runs on port 8081.
CD into /server and run npm run start -- the server runs on port 4000.

The app's been tested on web and Android; for testing with Android, you'll need to switch 'localhost' in line 31 of SearchBar.tsx to the ip address of the network your phone is connected to (if you want to scan with Expo).

Things to note:
- The font provided was for iOS only. Since I didn't have an iOS machine, I did some googling and saw SF Pro was originally based off Helvetica. So, the font is in Helvetica. Hopefully it's not too off!
- Similarly, for the same reason, it hasn't been tested on an iPhone. Sorry 🙏🙏🙏
- I added a loading indicator for when the data is fetching.
- I also added an error message for if the data isn't able to be fetched, just so the user isn't left wondering.
- The mockup includes a number of languages for the 'languages' section of the result screen, when you click into a repo. However, in both the GitHub schema and the responses I scanned, it seems like the language is just a string, so I've only included the one that was provided.
- Currently, the search only triggers if three characters have been input, and it's on a 500 ms debounce.
