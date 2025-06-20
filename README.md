citflow
=================

A amazing command line interface to operate citflow.


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/citflow.svg)](https://npmjs.org/package/citflow)
[![Downloads/week](https://img.shields.io/npm/dw/citflow.svg)](https://npmjs.org/package/citflow)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g citflow
$ citflow COMMAND
running command...
$ citflow (--version)
citflow/0.0.0 darwin-arm64 node-v20.19.2
$ citflow --help [COMMAND]
USAGE
  $ citflow COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`citflow autocomplete [SHELL]`](#citflow-autocomplete-shell)
* [`citflow help [COMMAND]`](#citflow-help-command)
* [`citflow llm auth list`](#citflow-llm-auth-list)
* [`citflow llm auth set`](#citflow-llm-auth-set)
* [`citflow llm auth sync`](#citflow-llm-auth-sync)
* [`citflow llm proxy start`](#citflow-llm-proxy-start)
* [`citflow login`](#citflow-login)
* [`citflow openapi`](#citflow-openapi)
* [`citflow openapi codegen`](#citflow-openapi-codegen)
* [`citflow user apikey del`](#citflow-user-apikey-del)
* [`citflow user apikey gen`](#citflow-user-apikey-gen)
* [`citflow user apikey get`](#citflow-user-apikey-get)
* [`citflow user apikey list`](#citflow-user-apikey-list)
* [`citflow user apikey set`](#citflow-user-apikey-set)
* [`citflow user set`](#citflow-user-set)

## `citflow autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ citflow autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ citflow autocomplete

  $ citflow autocomplete bash

  $ citflow autocomplete zsh

  $ citflow autocomplete powershell

  $ citflow autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.2.31/src/commands/autocomplete/index.ts)_

## `citflow help [COMMAND]`

Display help for citflow.

```
USAGE
  $ citflow help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for citflow.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.29/src/commands/help.ts)_

## `citflow llm auth list`

List all LLM auths.

```
USAGE
  $ citflow llm auth list [--show-secrets]

FLAGS
  --show-secrets  Show client secrets in the output.

DESCRIPTION
  List all LLM auths.

EXAMPLES
  $ citflow llm auth list
```

_See code: [src/commands/llm/auth/list.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/llm/auth/list.ts)_

## `citflow llm auth set`

Set LLM auth metadata.

```
USAGE
  $ citflow llm auth set --name <value> [--agent <value>] [--client-id <value>] [--client-secret <value>] [-f]
    [--tenant <value>]

FLAGS
  -f, --force                  Force set without confirmation if no related LLM auth metadata found online.
      --agent=<value>          [default: simple_agent] Agent for the LLM auth metadata.
      --client-id=<value>      Client ID for the LLM auth metadata.
      --client-secret=<value>  Client secret for the LLM auth metadata.
      --name=<value>           (required) Name of the LLM auth metadata to set.
      --tenant=<value>         Tenant for the LLM auth metadata.

DESCRIPTION
  Set LLM auth metadata.

EXAMPLES
  $ citflow llm auth set --name <name>
  ✔ Name: <name>
  ✔ Client ID: <client-id>
  ✔ Tenant: <tenant>
  ✔ Client Secret: <client-secret>
  LLM auth metadata <name> has been set successfully.
```

_See code: [src/commands/llm/auth/set.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/llm/auth/set.ts)_

## `citflow llm auth sync`

Sync LLM auth metadata from user apikey.

```
USAGE
  $ citflow llm auth sync [-f]

FLAGS
  -f, --force  Force sync without confirmation.

DESCRIPTION
  Sync LLM auth metadata from user apikey.

EXAMPLES
  $ citflow llm auth sync
```

_See code: [src/commands/llm/auth/sync.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/llm/auth/sync.ts)_

## `citflow llm proxy start`

Proxy for LLM API.

```
USAGE
  $ citflow llm proxy start [--traffic balance|encourage|none]

FLAGS
  --traffic=<option>  [default: balance] Not balance traffic by registered llm auth.
                      <options: balance|encourage|none>

DESCRIPTION
  Proxy for LLM API.

EXAMPLES
  $ citflow llm proxy start

  $ citflow llm proxy start --traffic balance

  $ citflow llm proxy start --traffic encourage
```

_See code: [src/commands/llm/proxy/start.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/llm/proxy/start.ts)_

## `citflow login`

Login to CI&T Flow

```
USAGE
  $ citflow login [--channel portal]

FLAGS
  --channel=<option>  [default: portal] The channel through which the request is made, affecting the resulting URL.
                      <options: portal>

DESCRIPTION
  Login to CI&T Flow

EXAMPLES
  $ citflow login
  Logging in to CI&T Flow...
  A browser window has been opened at https://flow.ciandt.com/login. Please continue the login in the web browser.
  Browser window has been closed, processing the login result...
  ✔ Email: xxx@ciandt.com
  ✔ Principal Tenant: CI&T Playground
  ✔ Active Tenant: CI&T Playground
  You have successfully logged in to CI&T Flow!

  $ citflow login --channel portal
```

_See code: [src/commands/login.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/login.ts)_

## `citflow openapi`

OpenAPI schema preview

```
USAGE
  $ citflow openapi --service global-settings|user-api|login-service|knowledge-api|auth-engine-api|all

FLAGS
  --service=<option>  (required) The service to preview the OpenAPI schema for.
                      <options: global-settings|user-api|login-service|knowledge-api|auth-engine-api|all>

DESCRIPTION
  OpenAPI schema preview

EXAMPLES
  $ citflow openapi --service login-service
  Preview the OpenAPI schema for the login service
```

_See code: [src/commands/openapi/index.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/openapi/index.ts)_

## `citflow openapi codegen`

OpenAPI code generation

```
USAGE
  $ citflow openapi codegen --service global-settings|user-api|login-service|knowledge-api|auth-engine-api|all

FLAGS
  --service=<option>  (required) The service to preview the OpenAPI schema for.
                      <options: global-settings|user-api|login-service|knowledge-api|auth-engine-api|all>

DESCRIPTION
  OpenAPI code generation

EXAMPLES
  $ citflow openapi:codegen --service global-settings
  Generating code for service: global-settings
  xxx
  Code generation for service global-settings completed successfully.
  ----------------------------------------
```

_See code: [src/commands/openapi/codegen.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/openapi/codegen.ts)_

## `citflow user apikey del`

Delete an API key for the authenticated user.

```
USAGE
  $ citflow user apikey del [-f] [-s <value>]

FLAGS
  -f, --force           Force deletion without confirmation.
  -s, --search=<value>  Search term to filter API keys by name or client ID.

DESCRIPTION
  Delete an API key for the authenticated user.

EXAMPLES
  $ citflow user apikey del
  Select an API key to delete: my-api-key (xxx)
  Deleting API key my-api-key (xxx)...
  ? Are you sure you want to delete this API key? Yes
  ✔ API key deleted.

  $ citflow user apikey del --search my-api-key
  Deleting API key my-api-key (xxx)...
  ? Are you sure you want to delete this API key? Yes
  ✔ API key deleted.
```

_See code: [src/commands/user/apikey/del.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/user/apikey/del.ts)_

## `citflow user apikey gen`

Create a new API key for the authenticated user.

```
USAGE
  $ citflow user apikey gen [--apps llm-api|metrics-api|agent-runner-api...] [-n <value>]

FLAGS
  -n, --name=<value>      Name of the API key.
      --apps=<option>...  [default: ] Comma-separated list of app names to access with this API key.
                          <options: llm-api|metrics-api|agent-runner-api>

DESCRIPTION
  Create a new API key for the authenticated user.

EXAMPLES
  $ citflow user apikey gen
  ✔ Enter a name for the API key: citflow-ec10ca46
  ✔ Select apps to access with this API key: llm-api, metrics-api
  Creating API key ...
  ✔ API key created successfully.
  ✔ Name: citflow-ec10ca46
  ✔ Apps: llm-api, metrics-api
  ✔ Client ID: xxx
  ✔ Client Secret: yyy
  ✔ Tenant Name: cit
  You can safely leave this window now, as the client secret cached on disk automatically.
  Or you can run `citflow user apikey get` to retrieve it later.

  $ citflow user apikey gen --name my-api-key --apps llm-api,metrics-api
```

_See code: [src/commands/user/apikey/gen.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/user/apikey/gen.ts)_

## `citflow user apikey get`

Get Client Secret for the authenticated user.

```
USAGE
  $ citflow user apikey get [-s <value>]

FLAGS
  -s, --search=<value>  Search term to filter API keys by name or client ID.

DESCRIPTION
  Get Client Secret for the authenticated user.

EXAMPLES
  $ citflow user apikey get
  Select an API key to retrieve: my-api-key (xxx)
  ✔ Name: my-api-key
  ✔ Client ID: xxx
  ✔ Client Secret: xxx

  $ citflow user apikey get --search my-api-key
  ✔ Name: my-api-key
  ✔ Client ID: xxx
  ✔ Client Secret: xxx
```

_See code: [src/commands/user/apikey/get.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/user/apikey/get.ts)_

## `citflow user apikey list`

List all API keys for the authenticated user.

```
USAGE
  $ citflow user apikey list [--show-inactive] [--show-secrets]

FLAGS
  --show-inactive  Show inactive API keys in the output.
  --show-secrets   Show client secrets in the output.

DESCRIPTION
  List all API keys for the authenticated user.

EXAMPLES
  $ citflow user apikey list

  $ citflow user apikey list --show-inactive

  $ citflow user apikey list --show-secrets

  $ citflow user apikey list --inactive --show
```

_See code: [src/commands/user/apikey/list.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/user/apikey/list.ts)_

## `citflow user apikey set`

Set an API key for the authenticated user.

```
USAGE
  $ citflow user apikey set [--client-id <value>] [--client-secret <value>] [-f]

FLAGS
  -f, --force                  Force set without confirmation if no related API key found online.
      --client-id=<value>      Client ID of the API key to set.
      --client-secret=<value>  Client Secret of the API key to set.

DESCRIPTION
  Set an API key for the authenticated user.

EXAMPLES
  $ citflow user apikey set
  ✔ Client ID: xxx
  ✔ Client Secret: ***
  API key set successfully.
  To retrieve the API key, run: `citflow user apikey get --client-id xxx`

  $ citflow user apikey set --client-id xxx

  $ citflow user apikey set --client-id xxx --client-secret yyy
```

_See code: [src/commands/user/apikey/set.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/user/apikey/set.ts)_

## `citflow user set`

Set a default account from the list of authenticated accounts.

```
USAGE
  $ citflow user set [--email <value>]

FLAGS
  --email=<value>  The email of the account to set as default.

DESCRIPTION
  Set a default account from the list of authenticated accounts.

EXAMPLES
  $ citflow user set
  Only one authenticated account found. Setting email:xxx@ciandt.com as default.
  Default account set to email:xxx@ciandt.com.

  $ citflow user set --email xxx@ciandt.com
  Setting email:xxx@ciandt.com as default.
  Default account set to email:xxx@ciandt.com.
```

_See code: [src/commands/user/set.ts](https://github.com/nodite/citflow/blob/v0.0.0/src/commands/user/set.ts)_
<!-- commandsstop -->
