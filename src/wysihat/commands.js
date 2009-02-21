/** section: wysihat
 * mixin WysiHat.Commands
 *
 * Methods will be mixed into the editor element. Most of these
 * methods will be used to bind to button clicks or key presses.
 *
 * var editor = WysiHat.Editor.attach(textarea);
 * $('bold_button').observe('click', function(event) {
 *   editor.boldSelection();
 *   Event.stop(event);
 * });
 *
 * In this example, it is important to stop the click event so you don't
 * lose your current selection.
 **/
WysiHat.Commands = {
  /**
   * WysiHat.Commands#boldSelection() -> undefined
   *  Bolds the current selection.
   **/
  boldSelection: function() {
    this.execCommand('bold', false, null);
  },

  /**
   * WysiHat.Commands#boldSelected() -> boolean
   *  Check if current selection is bold or strong.
   **/
  boldSelected: function() {
    return this.queryCommandState('bold');
  },

  /**
   * WysiHat.Commands#underlineSelection() -> undefined
   *  Underlines the current selection.
   **/
  underlineSelection: function() {
    this.execCommand('underline', false, null);
  },

  /**
   * WysiHat.Commands#underlineSelected() -> boolean
   *  Check if current selection is underlined.
   **/
  underlineSelected: function() {
    return this.queryCommandState('underline');
  },

  /**
   * WysiHat.Commands#italicSelection() -> undefined
   *  Italicizes the current selection.
   **/
  italicSelection: function() {
    this.execCommand('italic', false, null);
  },

  /**
   * WysiHat.Commands#italicSelected() -> boolean
   *  Check if current selection is italic or emphasized.
   **/
  italicSelected: function() {
    return this.queryCommandState('italic');
  },

  /**
   * WysiHat.Commands#italicSelection() -> undefined
   *  Strikethroughs the current selection.
   **/
  strikethroughSelection: function() {
    this.execCommand('strikethrough', false, null);
  },

  /**
   * WysiHat.Commands#blockquoteSelection() -> undefined
   *  Blockquotes the current selection.
   **/
  blockquoteSelection: function() {
    this.execCommand('blockquote', false, null);
  },

  /**
   * WysiHat.Commands#colorSelection(color) -> undefined
   * - color (String): a color name or hexadecimal value
   *  Sets the foreground color of the current selection.
   **/
  colorSelection: function(color) {
    this.execCommand('forecolor', false, color);
  },

  /**
   * WysiHat.Commands#linkSelection(url) -> undefined
   * - url (String): value for href
   *  Wraps the current selection in a link.
   **/
  linkSelection: function(url) {
    this.execCommand('createLink', false, url);
  },

  /**
   * WysiHat.Commands#insertOrderedList() -> undefined
   *  Formats current selection as an ordered list. If the selection is empty
   *  a new list is inserted.
   **/
  insertOrderedList: function() {
    this.execCommand('insertorderedlist', false, null);
  },

  /**
   * WysiHat.Commands#insertUnorderedList() -> undefined
   *  Formats current selection as an unordered list. If the selection is empty
   *  a new list is inserted.
   **/
  insertUnorderedList: function() {
    this.execCommand('insertunorderedlist', false, null);
  },

  /**
   * WysiHat.Commands#insertImage(url) -> undefined
   * - url (String): value for src
   *  Insert an image at the insertion point with the given url.
   **/
  insertImage: function(url) {
    this.execCommand('insertImage', false, url);
  },

  /**
   * WysiHat.Commands#insertHTML(html) -> undefined
   * - html (String): HTML or plain text
   *  Insert HTML at the insertion point.
   **/
  insertHTML: function(html) {
    if (Prototype.Browser.IE) {
      var range = this._selection.getRange();
      range.pasteHTML(html);
      range.collapse(false);
      range.select();
    } else {
      this.execCommand('insertHTML', false, html);
    }
  },

  /**
   * WysiHat.Commands#execCommand(command[, ui = false][, value = null]) -> undefined
   * - command (String): Command to execute
   * - ui (Boolean): Boolean flag for showing UI. Currenty this not
   *   implemented by any browser. Just use false.
   * - value (String): Value to pass to command
   *  A simple delegation method to the documents execCommand method.
   **/
  execCommand: function(command, ui, value) {
    var document = this.getDocument();
    document.execCommand(command, ui, value);
  },

  /**
   * WysiHat.Commands#queryCommandState(state) -> Boolean
   * - state (String): bold, italic, underline, etc
   *
   *  A simple delegation method to the document's queryCommandState method.
   **/
  queryCommandState: function(state) {
    var document = this.getDocument();
    return document.queryCommandState(state);
  }
};

WysiHat.Editor.extension(WysiHat.Commands);
