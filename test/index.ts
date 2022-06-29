import { Test } from './test-utils'
import { connect } from "../src/index"

const connectTest = new Test(connect, false, [])
connectTest.test()