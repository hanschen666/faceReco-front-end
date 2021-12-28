import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import React from "react";
import Particles from "react-tsparticles";

const options = {
  fpsLimit: 100,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 300,
        duration: 1,
        opacity: 0.8,
        size: 10,
      },
      push: {
        quantity: 0.2,
      },
      repulse: {
        distance: 200,
        duration: 1,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 170,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: true,
      speed: 0.5,
      straight: true,
    },
    number: {
      density: {
        enable: false,
        value_area: 600,
      },
      value: 60,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "line",
    },
    size: {
      random: false,
      value: 5,
    },
  },
  detectRetina: true,
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.querySelector("#img");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left: clarifaiFace.left_col * width,
      right: width - clarifaiFace.right_col * width,
      top: clarifaiFace.top_row * height,
      bottom: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };
  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    });
    fetch("https://shrouded-savannah-81851.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())

      .then((response) => {
        if (response) {
          fetch("https://shrouded-savannah-81851.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => {
              console.log(err);
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };
  onRouteChange = (route) => {
    if (route !== "home") {
      this.setState(initialState);
    }
    this.setState({
      route: route,
    });
  };

  onDelete = () => {
    fetch("https://shrouded-savannah-81851.herokuapp.com/delete", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
      }),
    }).then((response) => {
      console.log(response);
    });
  };
  
  render() {
    const particlesInit = (main) => {};

    const particlesLoaded = (container) => {};
    return (
      <div className="App">
        <Particles
          className="particles"
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={options}
        />
        <Navigation
          onRouteChange={this.onRouteChange}
          route={this.state.route}
          onDelete={this.onDelete}
        ></Navigation>
        {this.state.route === "signin" ? (
          <Signin
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          ></Signin>
        ) : this.state.route === "home" ? (
          <div>
            <Logo></Logo>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            ></Rank>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            ></ImageLinkForm>
            <FaceRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            ></FaceRecognition>
          </div>
        ) : (
          <div>
            <Register
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            ></Register>
          </div>
        )}
      </div>
    );
  }
}

export default App;
