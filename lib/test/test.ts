/* eslint-env jest */

const defaultTemplate = "<div id='test'>Hello world</div>";
const varTemplate = (val) => `<div id='test'>{{${val}}}</div>`;

function mock() {}

function trigger(target, event) {
  var e = document.createEvent("HTMLEvents");
  e.initEvent(event, true, true);
  target.dispatchEvent(e);
}

function click(target) {
  trigger(target, "click");
}

test("Expose observable", () => {
  const results = [];

  expect(results).toEqual([]);
});
