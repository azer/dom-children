var children = require("./");
var ul, foo, bar, qux;

beforeEach(function(){
  document.body.innerHTML = '<ul class="ul"><li>foo</li><li>qux</li></ul>';
  ul = document.querySelector('ul');
  foo = ul.firstChild;
  bar = document.createElement('li');
  bar.innerHTML = 'bar';
  qux = foo.nextSibling;
});


describe('.add(element, child)', function(){
  it('adds given element', function(){
    children.add(ul, bar);
    expect(ul.lastChild).to.equal(bar);
  });

  it('parses HTML if required', function(){
    children.add('ul', '<li class="{name}">{name}</li>', { name: 'corge' });
    expect(ul.lastChild).to.equal(document.querySelector('li.corge'));
  });
});

describe('.addBefore(element, child, reference)', function(){
  it('adds given element before reference', function(){
    children.addBefore(ul, bar, qux);
    expect(ul.lastChild).to.equal(qux);
    expect(qux.previousSibling).to.equal(bar);
  });

  it('parses HTML if required', function(){
    children.addBefore('ul', '<li class="{name}">{name}</li>', { name: 'corge' }, qux);
    expect(ul.lastChild).to.equal(qux);
    expect(ul.lastChild.previousSibling).to.equal(document.querySelector('li.corge'));
  });
});

describe('.addAfter(element, child, reference)', function(){
  it('adds given element after reference', function(){
    children.addAfter(ul, bar, foo);
    expect(ul.lastChild).to.equal(qux);
    expect(qux.previousSibling).to.equal(bar);
  });

  it('adds after last element', function(){
    children.addAfter('ul', bar, qux);
    expect(ul.lastChild).to.equal(bar);
    expect(bar.previousSibling).to.equal(qux);
  });


  it('parses HTML if required', function(){
    children.addAfter(ul, '<li class="{name}">{name}</li>', { name: 'corge' }, foo);
    expect(ul.lastChild).to.equal(qux);
    expect(ul.lastChild.previousSibling).to.equal(document.querySelector('li.corge'));
  });
});

describe('insert(element, parent)', function(){
  it('inserts element to parent', function(){
    children.insert(bar, ul);
    expect(ul.lastChild).to.equal(bar);
  });

  it('parses HTML if required', function(){
    children.insert('<li class="{name}">{name}</li>', { name: 'corge' }, 'ul');
    expect(ul.lastChild).to.equal(document.querySelector('li.corge'));
  });
});

describe('replace(parent, target, repl)', function(){
  it('replaces target with repl', function(){
    children.replace(ul, qux, bar);
    expect(ul.lastChild).to.equal(bar);
  });

  it('parses HTML if required', function(){
    children.replace('ul', qux, '<li class="{name}">{name}</li>', { name: 'corge' });
    expect(ul.lastChild).to.equal(document.querySelector('li.corge'));
  });
});

describe('remove(element)', function(){
  it('removes given element', function(){
    children.remove(foo);
    expect(ul.firstChild).to.equal(qux);
  });

  it('removes by css query', function(){
    children.remove('ul li');
    expect(ul.firstChild).to.equal(null);
  });

  it('allows specifying a parent element', function(){
    children.remove(ul, '*');
    expect(ul.firstChild).to.equal(null);
    expect(document.body.firstChild).to.equal(ul);
  });

  it('allows parent element to be a query, too', function(){
    children.remove('ul', '*');
    expect(ul.firstChild).to.equal(null);
    expect(document.body.firstChild).to.equal(ul);
  });

});
