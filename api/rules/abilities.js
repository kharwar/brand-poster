const { AbilityBuilder, Ability } = require("@casl/ability");

let ANONYMOUS_ABILITY;

const defineAdminRules = ({ can }, user) => {
  can('manage', 'all');
};

const defineUserRules = ({ can, cannot }, user) => {
  can('manage', 'User', { id: user.id });
  can('manage', 'Business', { userId: user.id });
  cannot('manage', 'Category');
};

const defineVisitorRules = ({ can }) => {
  can('read', 'User');
};
const defineAbilityFor = (user) => {
  if (user) {
    return new Ability(defineRulesFor(user));
  }
  ANONYMOUS_ABILITY = ANONYMOUS_ABILITY || new Ability(defineRulesFor({}));
  return ANONYMOUS_ABILITY;
};


const defineRulesFor = (user) => {
  const builder = new AbilityBuilder(Ability);
  switch (user.role) {
    case 'ADMIN':
      defineAdminRules(builder, user);
      break;
    case 'USER':
      defineUserRules(builder, user);
      break;
    default:
      defineVisitorRules(builder);
      break;
  }
  return builder.rules;
};

module.exports = { defineAbilityFor, defineRulesFor };