export interface ListItem {
  id: string;
  name: string;
  description: string | undefined;
  date: string;
}

export interface CreateListItem
  extends Pick<ListItem, 'name' | 'date' | 'description'> {}
