import React from 'react';
import { {{camelCase name}}WrapperVariants } from './{{pascalCase name}}.variants';

export interface {{pascalCase name}}Props {}

const {{pascalCase name}} = ({}: {{pascalCase name}}Props) => {
  return (
    <div className={{{camelCase name}}WrapperVariants()} data-testid="{{kebabCase name}}-container">
      This is the {{pascalCase name}} component.
    </div>
  )
}

export default {{pascalCase name}}
