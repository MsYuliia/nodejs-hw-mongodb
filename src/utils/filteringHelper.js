export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const filterParams = {};

  const validContactTypes = ['work', 'home', 'personal'];
  if (typeof type === 'string' && validContactTypes.includes(type)) {
    filterParams.contactType = type;
  } else {
    console.error(
      'Invalid contact type provided. Valid types are: work, home, personal.',
    );
  }

  if (typeof isFavourite === 'string') {
    const param = isFavourite.toLocaleLowerCase();
    if (param === 'true') {
      filterParams.isFavourite = true;
    } else if (param === 'false') {
      filterParams.isFavourite = false;
    } else {
      console.error(
        'Invalid value for isFavourite. It must be either true or false.',
      );
    }
  }

  return filterParams;
};
