# Youtube to iPod Converter
A simple program that takes a batch of YouTube videos and converts them to an iPod-playable format. This is a severe work in progress and only downloads videos to a temporary folder in the program folder - it does not do any cleanup as of yet.

## Prerequisites
This is a Node.JS application, and requires the following modules (use ```npm install``` if able):
```
ytdl-core
FFMPEG Win32/64 Binaries (found on the FFMPEG website)
```

## JSON Structure
Currently, the program only reads from one JSON file and takes no arguments ("test-batch.json"). The structure of the JSON is below:
```json
{
    "batchName": "{BATCH_NAME}",
    "batchLinks": [
        "{VIDEO_LINK_1}",
        "{VIDEO_LINK_2}",
        "{VIDEO_LINK_3}"
    ]
}
```
You can add as many links as you like to the batch links. Be aware that all videos are downloaded asyncronously.

# Build Instructions
There is not much building to do here, just make sure you have the prereqesites and run the program with:
```
node index.js
```

If this fails, make sure FFMPEG is placed correctly - only place the contents of the **bin/** folder in the FFMPEG binaries into the root of this directory. DO NOT change the name, unless you wish to change stuff in the source code.

# Run Instructions
Run the program with:
```
node index.js
```

You would usually be able to pass an argument with a JSON file, but this is in development and this isn't a priority right now. Just make sure your JSON file is formatted correctly, use the one above as an example.
