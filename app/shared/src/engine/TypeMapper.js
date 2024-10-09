Ext.define('WTW.util.TypeMapper', {
  singleton: true,

  alternateClassName: 'TypeMapper',

  classMapping: {
    ActionColumn: ActionColumnUtil,
    AdvanceSearch: AdvanceSearchUtil,
    AdvanceSearchPanel: AdvanceSearchPanelUtil,
    Button: ButtonUtil,
    CheckBox: CheckBoxUtil,
    CheckColumn: CheckColumnUtil,
    Column: ColumnUtil,
    DateField: DateFieldUtil,
    DisplayField: DisplayFieldUtil,
    DropDown: ComboUtil,
    Field: FieldUtil,
    FieldGroup: FieldGroupUtil,
    Form: FormUtil,
    Grid: GridUtil,
    Group: PanelUtil,
    MenuButton: SplitButtonUtil,
    MySearchHeader: MySearchHeaderUtil,
    NumberField: NumberFieldUtil,
    PagingBar: PagingBarUtil,
    Panel: PanelUtil,
    RadioButtons: RadioFieldUtil,
    Rownumberer: RowNumbererUtil,
    SearchField: SearchFieldUtil,
    Spacer: TbFillUtil,
    Tab: PanelUtil,
    TabGroup: TabGroupUtil,
    TagField: TagFieldUtil,
    TextArea: TextAreaUtil
  },

  childKey: {
    tabpanel: 'items',
    'wtw-grid': 'columns',
    container: 'items',
    panel: 'items',
    'wtw-fieldgroup': 'items'
  },
});
