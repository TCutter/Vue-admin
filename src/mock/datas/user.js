export default {
  tokens: {
    admin: {
      token: 'admin-token'
    },
    editor: {
      token: 'editor-token'
    }
  },
  users: {
    'admin-token': {
      roles: ['admin'],
      introduction: `I'm a supper administrator`,
      avatar: 'https://avatars3.githubusercontent.com/u/31432487?s=400&u=575c3bac03a1e3edab0e0ba948fe4103db4f4618&v=4',
      name: 'Super Admin'
    },
    'editor-token': {
      roles: ['editor'],
      introduction: 'I am an editor',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Normal Editor'
    }  
  }
}
