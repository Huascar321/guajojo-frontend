export interface DialogData {
  icon: string;
  title: string;
  content: string;
  mainButton: {
    color: 'primary' | 'accent' | 'warn';
    title: string;
  };
}
