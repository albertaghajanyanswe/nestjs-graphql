import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: './graphql/schema.graphql',
  documents: [
    'src/**/*.{ts,tsx}', 
    'platform/{pageComponents,components,helpers,hooks,pages,public,serviceHooks}/**/*.{ts,tsx}', 
    '!src/gql/**/*'
  ],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: []
    }
  }
}
 
export default config