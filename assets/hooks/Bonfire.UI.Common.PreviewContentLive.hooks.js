/*
This file was generated by the Surface compiler.
*/

/*
This file was generated by the Surface compiler.
*/

let PreviewActivity = {
	isTruncated(element) {
		if (
			element &&
			(element.offsetHeight < element.scrollHeight ||
				element.offsetWidth < element.scrollWidth)
		) {
			console.log("element has an overflow, ie. truncated with CSS line-clamp");
			return true;
		} else {
			console.log("element is not truncated");
			return false;
		}
	},
	mounted() {
		this.el.addEventListener("click", (e) => {
			console.log("PreviewActivity clicked");
			let trigger = this.el.querySelector(".open_preview_link");
			let anchor = e.target.closest("a");
			console.log(e.target);

			// this was used to expand long posts by clicking on them, now replaced with a 'Read more' button
			// let previewable_activity = e.target.closest('.previewable_activity')
			// anchor == trigger || (!anchor && previewable_activity && ( previewable_activity.classList.contains('previewable_expanded') || this.isTruncated(previewable_activity.querySelector('.previewable_truncate')) == false)
			if (
				(trigger || !window.liveSocket) &&
				(!anchor || anchor.classList.contains("preview_activity_link")) &&
				!e.ctrlKey &&
				!e.metaKey &&
				(!window.getSelection().toString() ||
					window.getSelection().toString() == "") &&
				!e.target.closest("button") &&
				!e.target.closest("figure") &&
				!e.target.closest(".dropdown") &&
				!e.target.closest("[data-id=activity_actions]") &&
				!e.target.closest("[data-id=labelled_widget]")
			) {
				let uri =
					this.el.dataset.href ||
					(trigger !== undefined && trigger.getAttribute("href"));

				if (window.liveSocket) {
					// if (!e.target.closest('#preview_content')) {
					//   // NOTE: sticky feed, see https://github.com/bonfire-networks/bonfire-app/issues/901
					//   // if we're not already in preview_content (i.e. for feed in extra_contents, because it's in a different LV), don't use this and just redirect
					//   console.log("not in preview_content div, fallback to navigate")
					//   let uri = this.el.dataset.href || (trigger !== undefined && trigger.getAttribute('href'))
					//   if (uri) {
					//     this.pushEvent(
					//       "navigate",
					//       { to: uri }
					//     )
					//   }

					// } else {
					console.log("push event to load up the PreviewContent");

					// const feed = document.querySelector(".feed")
					const layout = document.getElementById("root");
					const main = document.getElementById("inner");
					const preview_content = document.getElementById("preview_content");
					const extra_contents = document.getElementById("the_extra_contents");

					let previous_scroll = null;

					this.pushEventTo(trigger, "open", {});

					// this.pushEvent("Bonfire.Social.Feeds:open_activity", { id: this.el.dataset.id, permalink: uri })

					if (layout) {
						previous_scroll = layout.scrollTop;
					}

					if (main) {
						main.classList.add("hidden");
					}
					if (extra_contents) {
						extra_contents.classList.add("hidden");
					}
					if (preview_content) {
						preview_content.classList.remove("hidden");
					}

					if (uri) {
						// console.log(uri)

						history.pushState(
							{
								previous_url: document.location.href,
								previous_scroll: previous_scroll,
							},
							"",
							uri,
						);
					}

					e.preventDefault();

					// }
				} else {
					// fallback if not connected with live socket

					if (uri) {
						console.log(uri);
						window.location = uri;
						e.preventDefault();
					} else {
						console.log("No URL");
					}
				}
			} else {
				// e.preventDefault();

				console.log(
					"PreviewActivity: do not trigger preview in favour of another link or button's action (or opening in new tab)",
				);

				console.log(trigger);
				console.log(window.liveSocket);
				console.log(anchor);
				// console.log(anchor.classList)
				console.log(e.ctrlKey);
				console.log(e.metaKey);
				console.log(window.getSelection().toString());
				console.log(e.target.closest("button"));
				console.log(e.target.closest("figure"));
				console.log(e.target.closest(".dropdown"));
				console.log(e.target.closest("[data-id=activity_actions]"));

				// if (previewable_activity) { previewable_activity.classList.add("previewable_expanded") }

				return;
			}
		});
	},
};

// let Back = {
//   mounted() {

//     if (window.history.length > 1) {
//       // show the back icon svg
//       this.el.classList.remove("hidden")

//       this.el.addEventListener("click", e => {
//         console.log(window.history)
//         e.preventDefault();
//         // window.history.back();

//        })
//       } else {
//       // se la cronologia del browser è vuota, non fare nulla
//     }

//     }
// }

let PreviewExtra = {
	mounted() {
		this.el.addEventListener("click", (e) => {
			console.log("click - attempt showing extra preview");
			e.preventDefault();

			const preview_content = document.getElementById("preview_content");
			const main = document.getElementById("inner");
			if (main && preview_content) {
				main.classList.add("hidden");
				const the_preview_contents = document.getElementById(
					"the_preview_contents",
				);
				if (the_preview_contents) {
					the_preview_contents.classList.add("hidden");
				}
				const extra_contents = document.getElementById("extra_contents");
				if (extra_contents) {
					extra_contents.classList.remove("hidden");
				}
				preview_content.classList.add("!visible");
				preview_content.classList.add("!h-auto");
				preview_content.classList.remove("hidden");
			} else {
				console.log("fallback to navigate");
				this.pushEvent("navigate", { to: this.el.dataset.to || "#unknown_to" });
			}
		});
	},
};

let ClosePreview = {
	mounted() {
		const maybe_browser_back = function () {
			if (history.state) {
				location_before_preview = history.state["previous_url"];
				previous_scroll = history.state["previous_scroll"];
				if (location_before_preview) {
					history.pushState({}, "", location_before_preview);
				}
				if (previous_scroll) {
					layout.scrollTo({ top: previous_scroll, behavior: "instant" });
					// window.scrollTo(0, previous_scroll);
				}
			}
		};

		const close_or_back = function () {
			const the_preview_contents = document.getElementById(
				"the_preview_contents",
			);
			const the_extra_contents = document.getElementById("the_extra_contents");
			if (the_preview_contents && the_extra_contents) {
				console.log("click - attempt going back to extra content");

				const extra_contents = document.getElementById("extra_contents");

				the_preview_contents.classList.add("hidden");
				extra_contents.classList.remove("hidden");
				the_extra_contents.classList.remove("hidden");
			} else {
				const preview_content = document.getElementById("preview_content");
				if (preview_content) {
					console.log("click - attempt going back to main view");
					const main =
						document.getElementById("inner_inner") ||
						document.getElementById("inner");
					preview_content.classList.add("hidden");
					main.classList.remove("hidden");
				} else {
					console.log("click - attempt browser back");
					maybe_browser_back();
				}
			}
		};

		// close button
		this.el.addEventListener("click", (e) => {
			close_or_back();
		});

		// intercept browser "back" action
		window.addEventListener("popstate", (e) => {
			console.log("popstate - attempt going back via browser");

			// prevent the app from firing the event
			e.preventDefault();
			console.log("qui");

			// this.pushEvent("Bonfire.UI.Common.OpenPreviewLive:close", {})
			close_or_back();
		});
	},
};

let CloseAll = {
	mounted() {
		// close button
		this.el.addEventListener("click", (e) => {
			const the_preview_contents = document.getElementById(
				"the_preview_contents",
			);
			const the_extra_contents = document.getElementById("the_extra_contents");

			if (the_extra_contents || the_preview_contents) {
				console.log("click - attempt going back to main view");
				const main = document.getElementById("inner");
				main.innerHTML = ""; // empty previous contents - TODO: show loading placeholder/animation? and skip if destination is existing view
				const preview_content = document.getElementById("preview_content");
				preview_content.classList.add("hidden");
				main.classList.remove("hidden");
			} else {
				console.log("click - no preview open, stick to default action");
			}
		});
	},
};

export { PreviewActivity, PreviewExtra, ClosePreview, CloseAll };
