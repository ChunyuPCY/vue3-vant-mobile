local customizations = {
  { rule = "style/*", severity = "off", fixable = true },
  { rule = "format/*", severity = "off", fixable = true },
  { rule = "*-indent", severity = "off", fixable = true },
  { rule = "*-spacing", severity = "off", fixable = true },
  { rule = "*-spaces", severity = "off", fixable = true },
  { rule = "*-order", severity = "off", fixable = true },
  { rule = "*-dangle", severity = "off", fixable = true },
  { rule = "*-newline", severity = "off", fixable = true },
  { rule = "*quotes", severity = "off", fixable = true },
  { rule = "*semi", severity = "off", fixable = true },
}

local auto_format = vim.g.lazyvim_eslint_auto_format == nil or vim.g.lazyvim_eslint_auto_format

return {
  "neovim/nvim-lspconfig",
  -- other settings removed for brevity
  opts = {
    ---@type table<string, vim.lsp.Config>
    servers = {
      eslint = {
        filetypes = {
          "javascript",
          "javascriptreact",
          "javascript.jsx",
          "typescript",
          "typescriptreact",
          "typescript.tsx",
          "vue",
          "html",
          "markdown",
          "json",
          "jsonc",
          "yaml",
          "toml",
          "xml",
          "gql",
          "graphql",
          "astro",
          "svelte",
          "css",
          "less",
          "scss",
          "pcss",
          "postcss",
        },
        settings = {
          -- helps eslint find the eslintrc when it's placed in a subfolder instead of the cwd root
          workingDirectories = { mode = "auto" },
          format = auto_format,
          -- Silent the stylistic rules in you IDE, but still auto fix them
          rulesCustomizations = customizations,
        },
      },
    },
    setup = {
      eslint = function()
        if not auto_format then
          return
        end

        local formatter = LazyVim.lsp.formatter({
          name = "eslint: lsp",
          primary = false,
          priority = 200,
          filter = "eslint",
        })

        -- register the formatter with LazyVim
        LazyVim.format.register(formatter)
      end,
    },
  },
}
