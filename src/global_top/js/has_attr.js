

function has_attr(elem,test_attr){
  let attr = elem.attr(test_attr);

  if (typeof attr !== typeof undefined && attr !== false) {
      return true;
  }
  return false;
}