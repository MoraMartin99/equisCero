import Controller from "./Controller.js";
import Display from "./display/Display.js";
import Game from "./game/Game.js";
import AvatarProvider from "./AvatarProvider.js";

const model = new Game();
const view = new Display();
const providerId = "DiceBear";
const baseURL = "https://api.dicebear.com/9.x";
const avatarProvider = new AvatarProvider({ providerId, baseURL });

const controller = new Controller(model, view, avatarProvider);
