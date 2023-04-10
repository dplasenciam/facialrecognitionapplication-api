const returnClarifaiRequestOptions = (imageUrl) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // In this section, we set the user authentication, user and app ID, model details, and the URL
  // of the image we want as an input. Change these strings to run your own example.
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  //const PAT = "67df80e557db4d228ed1b894282a57b4";
  const PAT = "30aa229b22df4a3cb970b6fabc7ba791";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "g29pyxsulkqc";
  const APP_ID = "DanielPlasencia-FaceDetection";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "face-detection";
  //const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
  //const IMAGE_URL = this.state.input;
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
    MODEL_ID: MODEL_ID,
  };

  return requestOptions;
};

const handleApiCall = (req, res) => {
  //const requestOptions = returnClarifaiRequestOptions(this.state.input);
  const requestOptions = returnClarifaiRequestOptions(req.body.input);
  //console.log(requestOptions);
  fetch(
    "https://api.clarifai.com/v2/models/" +
      requestOptions.MODEL_ID +
      "/outputs",
    requestOptions
  )
    .then((data) => data.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

/////////////////////////////////////////

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      //console.log("entries => ", entries);
      //console.log("entries[0] => ", entries[0]);
      //console.log("entries[0].entries => ", entries[0].entries);
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
