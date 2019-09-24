import * as React from 'react';
import {
  PageSection,
  Title,
  TextContent,
  Text
} from '@patternfly/react-core';

export interface IParameterizedProps {
  param: number;
}

export const Parameterized: React.FunctionComponent<IParameterizedProps> = ({ param, children }) => {
  return (
    <>
      <PageSection>
        <TextContent>
          <Title size={"xl"}>Parametrized route</Title>
          <Text>Param: {param}</Text>
        </TextContent>      
      </PageSection>
      {children}
    </>
  );
}
