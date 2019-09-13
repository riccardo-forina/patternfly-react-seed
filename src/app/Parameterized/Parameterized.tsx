import * as React from 'react';
import {
  PageSection,
  Title,
  TextContent,
  Text
} from '@patternfly/react-core';

export interface IParameterizedProps {
  foo: number;
}

export const Parameterized: React.FunctionComponent<IParameterizedProps> = ({ foo }) => {
  return (
    <PageSection>
      <TextContent>
        <Title size={"xl"}>Parametrized route</Title>
        <Text>Foo: {foo}</Text>
      </TextContent>
    </PageSection>
  );
}
