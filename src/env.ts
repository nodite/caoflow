import 'dotenv/config'

import path from 'node:path'

import fs from 'fs-extra'
import {packageDirectorySync} from 'package-directory'

const CLI_DIR = process.cwd()

const PKG_DIR = packageDirectorySync() || CLI_DIR

const PKG_SRC_DIR = path.join(PKG_DIR, 'src')

const TMP_DIR = path.join(PKG_DIR, 'tmp')
await fs.ensureDir(TMP_DIR)

const OPENAPI_DIR = path.join(PKG_SRC_DIR, 'components', 'openapi')

const {FLOW_BASE_URL} = process.env

export {CLI_DIR, FLOW_BASE_URL, OPENAPI_DIR, PKG_DIR, PKG_SRC_DIR, TMP_DIR}
