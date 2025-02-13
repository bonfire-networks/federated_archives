let ExtensionHooks = {};

// NOTE: any extensions included here need to also be added to ./deps.js.sh
// NOTE: during development you may want to change 'deps' in the path to 'forks', but remember to change it back before committing! 
// TODO: make this more configurable? ie. don't import disabled extensions


// import LiveSelect from "./../../deps/live_select/assets/js/live_select"
import LiveSelect from "./../../deps/live_select/priv/static/live_select.min.js"

Object.assign(ExtensionHooks,  LiveSelect) // EditorCkHooks, EditorQuillHooks
 
export { ExtensionHooks }
