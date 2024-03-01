export interface ListItem {
  id: string;
  name: string;
  description: string;
  date: Date;
}

export interface CreateListItem
  extends Pick<ListItem, 'name' | 'date' | 'description'> {}
