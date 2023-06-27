export interface MenuData {
  panels: PanelData[];
}

export interface PanelData {
  title: string;
  icon: string;
  canActivate: boolean;
  items: PanelItem[];
}

export interface PanelItem {
  title: string;
  routerLink: string;
  canActivate: boolean;
}
