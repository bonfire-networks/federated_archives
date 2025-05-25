defmodule Bonfire.Web.Views.HomeLive do
  @moduledoc """
  The main instance home page, mainly for guests visiting the instance
  """
  use Bonfire.UI.Common.Web, :surface_live_view
  use_if_enabled(Bonfire.UI.Common.Web.Native, :view)

  alias Bonfire.Me.Accounts
  use Bonfire.Common.Settings

  on_mount {LivePlugs, [Bonfire.UI.Me.LivePlugs.LoadCurrentUser]}

  def mount(params, session, socket) do
    current_user = current_user(socket)

    case Settings.get([:ui, :homepage_redirect_to], nil, current_user) do
      url when is_binary(url) ->
        # redirect to configured homepage
        {:ok,
         socket
         |> redirect_to(url, fallback: "/dashboard", replace: false)}

      _ ->
        if is_nil(current_user) do
          # show guest homepage
          do_mount(params, session, socket)
        else
          # redirect to user dashboard
          {:ok,
           socket
           |> redirect_to("/dashboard", replace: false)}
        end
    end
  end

  defp do_mount(_params, _session, socket) do
    links =
      Config.get([:ui, :theme, :instance_welcome, :links], %{
        l("About Archives") => "https://example.org/about",
        l("Contribute") => "https://example.org/contribute"
      })

    app = String.capitalize(Bonfire.Application.name())

    {:ok,
     socket
     |> assign(
       page: "home",
       is_guest?: true,
       without_sidebar: true,
       without_secondary_widgets: true,
       no_header: true,
       selected_tab: :home,
       page_title: app,
       links: links,
       error: nil,
       loading: true,
       feed: nil,
       feed_id: nil,
       feed_ids: nil,
       feed_component_id: nil,
       page_info: nil
     )}
  end

  @decorate time()
  def handle_params(params, _url, socket) do
    # Use a specific feed for the homepage if needed
    feed_name = :local

    {
      :noreply,
      socket
      |> assign(
        Bonfire.Social.Feeds.LiveHandler.feed_default_assigns(
          {
            feed_name,
            params
          },
          socket
        )
      )
    }
  end
end