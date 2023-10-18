import { EnvironmentProviders, FactoryProvider, makeEnvironmentProviders } from "@angular/core";
import { ApolloClientOptions, InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import { Apollo, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { environment } from "../../../environments/environment";

function createApollo(httpLink: HttpLink): ApolloClientOptions<NormalizedCacheObject> {
  return {
    link: httpLink.create({
      uri: environment.strapiGraphQlUri,
    }),
    cache: new InMemoryCache(),
  };
}

export function provideApollo(): EnvironmentProviders {
  const apolloOptionsProvider: FactoryProvider = {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
  };

  return makeEnvironmentProviders([apolloOptionsProvider, Apollo]);
}
