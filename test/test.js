QUnit.module('My Unit Tests');

QUnit.test('Blah', function(assert) {
  assert.equal(
    window.timenow.textContent,
    'loading...',
    'This test passes if the content is not changed.'
  );
  updateTime();
  assert.notEqual(
    window.timenow.textContent,
    'loading...',
    'This test passes after the content is changed.'
  );
});
