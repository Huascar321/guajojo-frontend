import { Type } from '@angular/core';

interface ChildRoute {
  path: string;
  component: Type<any>;
  data: { breadcrumb: { alias: string } };
}

interface ComponentTypeParams {
  componentEditType: Type<any>;
  componentDetailType: Type<any>;
}

export function getRouteChildren(
  aliasName: string,
  componentTypeParams: ComponentTypeParams
): ChildRoute[] {
  return [
    {
      path: 'agregar',
      component: componentTypeParams.componentEditType,
      data: { breadcrumb: { alias: `${aliasName}-add` } }
    },
    {
      path: ':id',
      component: componentTypeParams.componentDetailType,
      data: { breadcrumb: { alias: `${aliasName}-detail` } }
    },
    {
      path: ':id/editar',
      component: componentTypeParams.componentEditType,
      data: { breadcrumb: { alias: `${aliasName}-edit` } }
    }
  ];
}
