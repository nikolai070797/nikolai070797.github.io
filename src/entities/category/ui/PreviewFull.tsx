import { Box, List, ListItem, Typography } from '@mui/material';
import { Category } from '@entities/category';
import { memo } from 'react';

export type CategoryPreviewFullProps = {
  category: Category;
};

const CategoryPreviewFull = memo(({ category }: CategoryPreviewFullProps) => {
  return (
    <Box id={category.id}>
      <List>
        <ListItem>
          <Typography variant="h6">{category.name}</Typography>
        </ListItem>
        {category.photo && (
          <ListItem>
            <Box sx={{ width: '100%' }}>
              <img src={category.photo} alt={category.name} style={{ width: '100%', height: 'auto' }} />
            </Box>
          </ListItem>
        )}
        <ListItem>
          <Typography variant="body2" color="textSecondary">
            Создано:{' '}
            {new Date(category.createdAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2" color="textSecondary">
            Обновлено:{' '}
            {new Date(category.updatedAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2" color="textSecondary">
            commandId: {category.commandId}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2" color="textSecondary">
            ID: {category.id}
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
});

export default CategoryPreviewFull;
