defmodule Bonfire.Web.Views.DashboardLive do
  use Bonfire.UI.Common.Web, :surface_live_view
  @behaviour Bonfire.UI.Common.LiveHandler

  on_mount {LivePlugs, [Bonfire.UI.Me.LivePlugs.LoadCurrentUser]}

  use Bonfire.PanDoRa.Web.ArchiveSearchLive, without_secondary_widgets: true
end
