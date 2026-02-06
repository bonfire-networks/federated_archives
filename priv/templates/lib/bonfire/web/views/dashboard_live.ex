defmodule Bonfire.Web.Views.DashboardLive do
  use Bonfire.UI.Common.Web, :surface_live_view
  alias PanDoRa.API.Client
  alias Bonfire.PanDoRa.Utils
  @behaviour Bonfire.UI.Common.LiveHandler


  on_mount {LivePlugs, [Bonfire.UI.Me.LivePlugs.LoadCurrentUser]}

  def mount(_params, _session, socket) do
    {:ok,
      socket
      |> assign(:page_title, "Search in your archive")
      |> assign(:without_secondary_widgets, true)
      |> assign(:term, nil)
    }
  end

  # Keep your existing handle_params implementation
  def handle_params(%{"term" => term}, _, socket) do
    {:noreply, assign(socket, term: term)}
  end

  def handle_params(_, _, socket), do: {:noreply, socket}

end
