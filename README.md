caoflow
=================

A amazing command line interface to operate caoflow.


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/caoflow.svg)](https://npmjs.org/package/caoflow)
[![Downloads/week](https://img.shields.io/npm/dw/caoflow.svg)](https://npmjs.org/package/caoflow)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g caoflow
$ caoflow COMMAND
running command...
$ caoflow (--version)
caoflow/0.0.0 darwin-arm64 node-v20.19.2
$ caoflow --help [COMMAND]
USAGE
  $ caoflow COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`caoflow autocomplete [SHELL]`](#caoflow-autocomplete-shell)
* [`caoflow help [COMMAND]`](#caoflow-help-command)
* [`caoflow llm auth list`](#caoflow-llm-auth-list)
* [`caoflow llm auth set`](#caoflow-llm-auth-set)
* [`caoflow llm auth sync`](#caoflow-llm-auth-sync)
* [`caoflow llm proxy start`](#caoflow-llm-proxy-start)
* [`caoflow login`](#caoflow-login)
* [`caoflow openapi`](#caoflow-openapi)
* [`caoflow openapi codegen`](#caoflow-openapi-codegen)
* [`caoflow user apikey del`](#caoflow-user-apikey-del)
* [`caoflow user apikey gen`](#caoflow-user-apikey-gen)
* [`caoflow user apikey get`](#caoflow-user-apikey-get)
* [`caoflow user apikey list`](#caoflow-user-apikey-list)
* [`caoflow user apikey set`](#caoflow-user-apikey-set)
* [`caoflow user set`](#caoflow-user-set)

## `caoflow autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ caoflow autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ caoflow autocomplete

  $ caoflow autocomplete bash

  $ caoflow autocomplete zsh

  $ caoflow autocomplete powershell

  $ caoflow autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.2.31/src/commands/autocomplete/index.ts)_

## `caoflow help [COMMAND]`

Display help for caoflow.

```
USAGE
  $ caoflow help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for caoflow.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.29/src/commands/help.ts)_

## `caoflow llm auth list`

List all LLM auths.

```
USAGE
  $ caoflow llm auth list [--show-secrets]

FLAGS
  --show-secrets  Show client secrets in the output.

DESCRIPTION
  List all LLM auths.

EXAMPLES
  $ caoflow llm auth list
```

_See code: [src/commands/llm/auth/list.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/llm/auth/list.ts)_

## `caoflow llm auth set`

Set LLM auth metadata.

```
USAGE
  $ caoflow llm auth set --name <value> [--agent <value>] [--client-id <value>] [--client-secret <value>] [-f]
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
  $ caoflow llm auth set --name <name>
  ✔ Name: <name>
  ✔ Client ID: <client-id>
  ✔ Tenant: <tenant>
  ✔ Client Secret: <client-secret>
  LLM auth metadata <name> has been set successfully.
```

_See code: [src/commands/llm/auth/set.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/llm/auth/set.ts)_

## `caoflow llm auth sync`

Sync LLM auth metadata from user apikey.

```
USAGE
  $ caoflow llm auth sync [-f]

FLAGS
  -f, --force  Force sync without confirmation.

DESCRIPTION
  Sync LLM auth metadata from user apikey.

EXAMPLES
  $ caoflow llm auth sync
```

_See code: [src/commands/llm/auth/sync.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/llm/auth/sync.ts)_

## `caoflow llm proxy start`

Proxy for LLM API.

```
USAGE
  $ caoflow llm proxy start [--traffic balance|encourage|none]

FLAGS
  --traffic=<option>  [default: balance] Not balance traffic by registered llm auth.
                      <options: balance|encourage|none>

DESCRIPTION
  Proxy for LLM API.

EXAMPLES
  $ caoflow llm proxy start

  $ caoflow llm proxy start --traffic balance

  $ caoflow llm proxy start --traffic encourage
```

_See code: [src/commands/llm/proxy/start.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/llm/proxy/start.ts)_

## `caoflow login`

Login to Flow

```
USAGE
  $ caoflow login [--channel portal]

FLAGS
  --channel=<option>  [default: portal] The channel through which the request is made, affecting the resulting URL.
                      <options: portal>

DESCRIPTION
  Login to Flow

EXAMPLES
  $ caoflow login
  Logging in to Flow...
  A browser window has been opened. Please continue the login in the web browser.
  Browser window has been closed, processing the login result...
  ✔ Email: xxx@gmail.com
  ✔ Principal Tenant: yyy
  ✔ Active Tenant: zzz
  You have successfully logged in to Flow!

  $ caoflow login --channel portal
```

_See code: [src/commands/login.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/login.ts)_

## `caoflow openapi`

OpenAPI schema preview

```
USAGE
  $ caoflow openapi --service global-settings|user-api|login-service|knowledge-api|auth-engine-api|all

FLAGS
  --service=<option>  (required) The service to preview the OpenAPI schema for.
                      <options: global-settings|user-api|login-service|knowledge-api|auth-engine-api|all>

DESCRIPTION
  OpenAPI schema preview

EXAMPLES
  $ caoflow openapi --service login-service
  Preview the OpenAPI schema for the login service
```

_See code: [src/commands/openapi/index.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/openapi/index.ts)_

## `caoflow openapi codegen`

OpenAPI code generation

```
USAGE
  $ caoflow openapi codegen --service global-settings|user-api|login-service|knowledge-api|auth-engine-api|all

FLAGS
  --service=<option>  (required) The service to preview the OpenAPI schema for.
                      <options: global-settings|user-api|login-service|knowledge-api|auth-engine-api|all>

DESCRIPTION
  OpenAPI code generation

EXAMPLES
  $ caoflow openapi:codegen --service global-settings
  Generating code for service: global-settings
  xxx
  Code generation for service global-settings completed successfully.
  ----------------------------------------
```

_See code: [src/commands/openapi/codegen.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/openapi/codegen.ts)_

## `caoflow user apikey del`

Delete an API key for the authenticated user.

```
USAGE
  $ caoflow user apikey del [-f] [-s <value>]

FLAGS
  -f, --force           Force deletion without confirmation.
  -s, --search=<value>  Search term to filter API keys by name or client ID.

DESCRIPTION
  Delete an API key for the authenticated user.

EXAMPLES
  $ caoflow user apikey del
  Select an API key to delete: my-api-key (xxx)
  Deleting API key my-api-key (xxx)...
  ? Are you sure you want to delete this API key? Yes
  ✔ API key deleted.

  $ caoflow user apikey del --search my-api-key
  Deleting API key my-api-key (xxx)...
  ? Are you sure you want to delete this API key? Yes
  ✔ API key deleted.
```

_See code: [src/commands/user/apikey/del.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/user/apikey/del.ts)_

## `caoflow user apikey gen`

Create a new API key for the authenticated user.

```
USAGE
  $ caoflow user apikey gen [--apps llm-api|metrics-api|agent-runner-api...] [-n <value>]

FLAGS
  -n, --name=<value>      Name of the API key.
      --apps=<option>...  [default: ] Comma-separated list of app names to access with this API key.
                          <options: llm-api|metrics-api|agent-runner-api>

DESCRIPTION
  Create a new API key for the authenticated user.

EXAMPLES
  $ caoflow user apikey gen
  ✔ Enter a name for the API key: caoflow-ec10ca46
  ✔ Select apps to access with this API key: llm-api, metrics-api
  Creating API key ...
  ✔ API key created successfully.
  ✔ Name: caoflow-ec10ca46
  ✔ Apps: llm-api, metrics-api
  ✔ Client ID: xxx
  ✔ Client Secret: yyy
  ✔ Tenant Name: zzz
  You can safely leave this window now, as the client secret cached on disk automatically.
  Or you can run `caoflow user apikey get` to retrieve it later.

  $ caoflow user apikey gen --name my-api-key --apps llm-api,metrics-api
```

_See code: [src/commands/user/apikey/gen.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/user/apikey/gen.ts)_

## `caoflow user apikey get`

Get Client Secret for the authenticated user.

```
USAGE
  $ caoflow user apikey get [-s <value>]

FLAGS
  -s, --search=<value>  Search term to filter API keys by name or client ID.

DESCRIPTION
  Get Client Secret for the authenticated user.

EXAMPLES
  $ caoflow user apikey get
  Select an API key to retrieve: my-api-key (xxx)
  ✔ Name: my-api-key
  ✔ Client ID: xxx
  ✔ Client Secret: xxx

  $ caoflow user apikey get --search my-api-key
  ✔ Name: my-api-key
  ✔ Client ID: xxx
  ✔ Client Secret: xxx
```

_See code: [src/commands/user/apikey/get.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/user/apikey/get.ts)_

## `caoflow user apikey list`

List all API keys for the authenticated user.

```
USAGE
  $ caoflow user apikey list [--show-inactive] [--show-secrets]

FLAGS
  --show-inactive  Show inactive API keys in the output.
  --show-secrets   Show client secrets in the output.

DESCRIPTION
  List all API keys for the authenticated user.

EXAMPLES
  $ caoflow user apikey list

  $ caoflow user apikey list --show-inactive

  $ caoflow user apikey list --show-secrets

  $ caoflow user apikey list --inactive --show
```

_See code: [src/commands/user/apikey/list.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/user/apikey/list.ts)_

## `caoflow user apikey set`

Set an API key for the authenticated user.

```
USAGE
  $ caoflow user apikey set [--client-id <value>] [--client-secret <value>] [-f]

FLAGS
  -f, --force                  Force set without confirmation if no related API key found online.
      --client-id=<value>      Client ID of the API key to set.
      --client-secret=<value>  Client Secret of the API key to set.

DESCRIPTION
  Set an API key for the authenticated user.

EXAMPLES
  $ caoflow user apikey set
  ✔ Client ID: xxx
  ✔ Client Secret: ***
  API key set successfully.
  To retrieve the API key, run: `caoflow user apikey get --client-id xxx`

  $ caoflow user apikey set --client-id xxx

  $ caoflow user apikey set --client-id xxx --client-secret yyy
```

_See code: [src/commands/user/apikey/set.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/user/apikey/set.ts)_

## `caoflow user set`

Set a default account from the list of authenticated accounts.

```
USAGE
  $ caoflow user set [--email <value>]

FLAGS
  --email=<value>  The email of the account to set as default.

DESCRIPTION
  Set a default account from the list of authenticated accounts.

EXAMPLES
  $ caoflow user set
  Only one authenticated account found. Setting email:xxx@gmail.com as default.
  Default account set to email:xxx@gmail.com.

  $ caoflow user set --email xxx@gmail.com
  Setting email:xxx@gmail.com as default.
  Default account set to email:xxx@gmail.com.
```

_See code: [src/commands/user/set.ts](https://github.com/nodite/caoflow/blob/v0.0.0/src/commands/user/set.ts)_
<!-- commandsstop -->
