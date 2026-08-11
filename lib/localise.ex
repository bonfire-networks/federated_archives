defmodule FederatedArchives.Localise do
  @moduledoc """
  Registers the object type names for gettext extraction, at compile time.

  See `Bonfire.Common.Localise.localise_object_type_names/0` for why this belongs to a flavour extension rather than to `bonfire_common` or the root app: the root's `lib/` is never compiled during `just localise-extract` (an umbrella root owns no source), and the object type list is enumerated from *loaded* applications, so it needs a vantage point that depends on every extension in the build — which is what a flavour is.
  """

  use Bonfire.Common.Localise

  Bonfire.Common.Localise.localise_object_type_names()
end
