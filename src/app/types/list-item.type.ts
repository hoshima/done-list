export type ListItem = {
  id: string;
  name: string;
  description: string | undefined;
  date: string;
};

export type ListItemCreate = Pick<ListItem, 'name' | 'date' | 'description'>;
