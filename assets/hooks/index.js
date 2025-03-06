/*
This file was generated by the Surface compiler.
*/

function ns(hooks, nameSpace) {
  const updatedHooks = {}
  Object.keys(hooks).map(function(key) {
    updatedHooks[`${nameSpace}#${key}`] = hooks[key]
  })
  return updatedHooks
}

import * as c1 from "./Bonfire.Editor.Milkdown.hooks.js"
import * as c2 from "./Bonfire.PanDoRa.Web.MovieLive.hooks.js"
import * as c3 from "./Bonfire.PanDoRa.Web.SearchLive.hooks.js"
import * as c4 from "./Bonfire.UI.Common.ViewCodeLive.hooks.js"
import * as c5 from "./Bonfire.UI.Common.LazyImage.hooks.js"
import * as c6 from "./Bonfire.UI.Common.OpenExternalLinkLive.hooks.js"
import * as c7 from "./Bonfire.UI.Common.PreviewContentLive.hooks.js"
import * as c8 from "./Bonfire.UI.Common.NotificationLive.hooks.js"
import * as c9 from "./Bonfire.UI.Common.LoadMoreLive.hooks.js"
import * as c10 from "./Bonfire.UI.Common.ChangeLocaleLive.hooks.js"
import * as c11 from "./Bonfire.UI.Common.ChangeThemesLive.hooks.js"
import * as c12 from "./Bonfire.UI.Common.ComposerLive.hooks.js"
import * as c13 from "./Bonfire.UI.Social.Activity.DateAgoLive.hooks.js"

let hooks = Object.assign(
  ns(c1, "Bonfire.Editor.Milkdown"),
  ns(c2, "Bonfire.PanDoRa.Web.MovieLive"),
  ns(c3, "Bonfire.PanDoRa.Web.SearchLive"),
  ns(c4, "Bonfire.UI.Common.ViewCodeLive"),
  ns(c5, "Bonfire.UI.Common.LazyImage"),
  ns(c6, "Bonfire.UI.Common.OpenExternalLinkLive"),
  ns(c7, "Bonfire.UI.Common.PreviewContentLive"),
  ns(c8, "Bonfire.UI.Common.NotificationLive"),
  ns(c9, "Bonfire.UI.Common.LoadMoreLive"),
  ns(c10, "Bonfire.UI.Common.ChangeLocaleLive"),
  ns(c11, "Bonfire.UI.Common.ChangeThemesLive"),
  ns(c12, "Bonfire.UI.Common.ComposerLive"),
  ns(c13, "Bonfire.UI.Social.Activity.DateAgoLive")
)

export default hooks
