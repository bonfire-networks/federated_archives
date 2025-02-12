defmodule FederatedArchives.RuntimeConfig do
  # use Bonfire.Common.Localise

  @behaviour Bonfire.Common.ConfigModule
  def config_module, do: true

  @doc """
  Sets runtime configuration for the extension (typically by reading ENV variables).
  """
  def config do
    import Config

    # config :federated_archives,
    #   modularity: System.get_env("ENABLE_federated_archives") || :disabled
  end
end
