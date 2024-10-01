import Item from './Item'

export default function ItemList({note}) {
  return (
    <div>
      {note.extendedIngredients?.map((item, index) => (
       <Item key={index} item={item} index={index} />
      ))}
    </div>
  );
}
