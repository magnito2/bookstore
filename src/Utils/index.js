export const checkUserIsAdmin = currentUser => {
    if(!currentUser || !Array.isArray(currentUser.userRoles)) return false;
    const { userRoles } = currentUser;
    if(userRoles.includes('admin')) return true;
    
    return false;
}


export const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
    })

const isObject = (item) => {
      return (item && typeof item === 'object' && !Array.isArray(item));
}
    
export const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, {
            [key]: {},
          });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key],
        });
      }
    }
  }
  return mergeDeep(target, ...sources);
};

export const wrapMergeDeep = (target, sources) => {
  console.log(`Source is ${JSON.stringify(sources)}`)
  console.log(`Target is ${JSON.stringify(target)}`)
  const merged = mergeDeep(Object.create(target), Object.create(sources))
  console.log(`Merge is ${JSON.stringify(merged)}`)
  return merged;
} 