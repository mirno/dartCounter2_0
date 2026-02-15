{
  description = "Development shell for dartCounter2_0 (Nixpkgs 25.11)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  };

  outputs = { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f system);
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          default = pkgs.mkShell {
            packages = [
              pkgs.go
              pkgs.gotests
              pkgs.richgo
              pkgs.lefthook
              pkgs.go-task
              pkgs.golangci-lint
              pkgs.delve
              pkgs.gotools
              pkgs.gosec
              pkgs.docker
              pkgs.step-cli
              pkgs.step-ca
              pkgs.openssl
              pkgs.jq
              pkgs.dnsmasq
              pkgs.dig
              pkgs.nmap
              pkgs.cfssl
              pkgs.coredns
              pkgs.lazygit
              pkgs.bat
            ];

            shellHook = ''
              echo "dartCounter2_0 devshell (nixpkgs 25.11)"
            '';
          };
        });
    };
}
