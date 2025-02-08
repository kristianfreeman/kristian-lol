/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Microsite URL - The URL of your microsite */
  "apiUrl": string,
  /** Secret Key - Your microsite secret key */
  "apiKey": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `update` command */
  export type Update = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `update` command */
  export type Update = {}
}

