
import React, { useState } from 'react';

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold tracking-tighter">搭搭</h1>
        <p className="text-xl mt-2 opacity-90">找到你的最佳搭子</p>
      </div>

      <div className="w-full max-w-sm bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">{isLogin ? '登录' : '注册'}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="手机号" 
              className="w-full px-4 py-3 bg-white/20 rounded-lg placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            />
             {!isLogin && (
                <>
                    <input 
                        type="text" 
                        placeholder="地区" 
                        className="w-full px-4 py-3 bg-white/20 rounded-lg placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <input 
                        type="text" 
                        placeholder="学校" 
                        className="w-full px-4 py-3 bg-white/20 rounded-lg placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                </>
            )}
            <input 
              type="password" 
              placeholder="密码" 
              className="w-full px-4 py-3 bg-white/20 rounded-lg placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {!isLogin && (
              <input 
                type="password" 
                placeholder="确认密码" 
                className="w-full px-4 py-3 bg-white/20 rounded-lg placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
              />
            )}
          </div>
          <button 
            type="submit" 
            className="w-full mt-8 py-3 bg-white text-indigo-600 font-bold rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            {isLogin ? '登录' : '注册'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          {isLogin ? '还没有账号？' : '已有账号？'}
          <button onClick={() => setIsLogin(!isLogin)} className="font-bold underline ml-2">
            {isLogin ? '立即注册' : '立即登录'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
