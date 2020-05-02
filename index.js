// Youtube to iPod Conversion
// By xFuney, 2020


// Initialise libraries. Nightmare nightmare nightmare nightmare.
const fs = require('fs');
const ytdl = require('ytdl-core');

// We'll probably add file selection later, but we don't need it right now.
// Just load a botched file for now.

let rawdata = fs.readFileSync('test_batch.json');
let batchData = JSON.parse(rawdata);

// Announce what we're doing to the user, if they actually give a shit.
console.log("YT to iPod Batch Converter")
console.log('Converting batch with name "'+ batchData["batchName"] + '" with ' + batchData["batchLinks"].length + " YouTube Links...")

// We can get into the grit of things, download sequentially - inefficient I know.
// It'll work and we care about THAT and THAT ONLY!

var videoTitleIndex = {}

var i;

    for (i = 0; i < batchData["batchLinks"].length; i++) {
        // Set the title to a fallback just incase information can't be found.
        var title = "ERROR_GETTING_INFORMATION"

        // Get title and author name of video, throw that into a title variable and an array that's in global scope.
        ytdl.getBasicInfo(batchData["batchLinks"][i], (err,info) => {
            // Catch the error, if one is provided, and throw it.
            if (err) throw err;

            // Define a "global" variable that we'll just use for quickness.
            var title = info.title + " - " + info.author.name
            
            // Create an element in the properly global array of titles, we'll call back to this later.
            videoTitleIndex[i] = title
            
            // Let the user know that we're going to begin downloading.
            console.log('Now downloading: ' + title + "...")
        })
        
        // DEBUG: Just prints out the link so that we can ensure that videos are being parsed properly.
        // This should probably be removed in later builds.
        console.log(batchData["batchLinks"][i]);
        
        // Download the video, make sure to catch promises for errors and pipe the stream to an FLV file.
        ytdl(batchData["batchLinks"][i])
            // Throw the error to the console's error function, instead of not handling this exception.
            .on('error', console.error)
            // Sends the content stream from YTDL to the FLV file that we're going to convert.
            // This saves to a temp folder because we'll delete it once we're done.
            .pipe(fs.createWriteStream('tmp/'+i+'.flv'))
            .on('finish', () => {
                // TODO: Find a working FFMPEG command and implement it.
                // Right now all it does is tell the user their download was a success.
                console.log("Successfully downloaded: " + videoTitleIndex[i] + ".")
            })
    }
