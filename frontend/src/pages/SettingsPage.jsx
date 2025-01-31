import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { daisyuiThemes } from "../constants/themes";
import { Send, Palette, Sparkles, Laptop, Moon, Sun } from "lucide-react";

const previewMessages = [
  {
    id: 1,
    content: "Hey, how are you?",
    isSent: true,
  },
  {
    id: 2,
    content: "I'm fine, thank you!",
    isSent: false,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex min-h-screen pt-16">
      <div className="flex-1 bg-gradient-to-b from-base-300/50 to-base-100">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:40px_40px] [mask-image:radial-gradient(white,transparent_90%)]" />
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-secondary/20 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto p-4 py-8">
          {/* Header Section with Glowing Effect */}
          <div className="relative text-center mb-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <h1 className="text-4xl font-bold mt-8 inline-flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary animate-gradient">
              <Sparkles className="size-8 text-primary animate-pulse" />
              Appearance Settings
            </h1>
            <p className="mt-2 pb-2 text-base-content/60">
              Customize the look and feel of your chat interface
            </p>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          {/* Theme Selection Section */}
          <div className="grid gap-8">
            {/* Theme Grid */}
            <div className="backdrop-blur-xl bg-base-100/50 rounded-3xl p-8 border border-base-content/5 shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Palette className="size-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Theme Selection</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {daisyuiThemes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`group relative backdrop-blur-xl bg-base-100/30 rounded-2xl p-4 border border-base-content/5 transition-all duration-300
                      ${
                        t === theme
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                          : "hover:bg-base-100/50"
                      }`}
                  >
                    <div className="space-y-3">
                      <div
                        className="h-12 rounded-xl overflow-hidden shadow-sm"
                        data-theme={t}
                      >
                        <div className="grid grid-cols-4 gap-px h-full p-1.5">
                          <div className="rounded bg-primary"></div>
                          <div className="rounded bg-secondary"></div>
                          <div className="rounded bg-accent"></div>
                          <div className="rounded bg-neutral"></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-medium capitalize">
                          {t.replace(/-/g, " ")}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Section */}
            <div className="backdrop-blur-xl bg-base-100/50 rounded-3xl p-8 border border-base-content/5 shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Laptop className="size-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Live Preview</h2>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="backdrop-blur-xl bg-base-100/30 rounded-2xl overflow-hidden border border-base-content/5">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-base-content/5">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium">John Doe</h3>
                        <div className="flex items-center gap-1.5">
                          <span className="size-2 bg-success rounded-full" />
                          <span className="text-xs text-base-content/60">
                            Online
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[240px] max-h-[240px] overflow-y-auto">
                    {previewMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-3.5 ${
                            message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-[10px] mt-1.5 ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }`}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-content/5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 bg-base-100/50 backdrop-blur text-sm h-11"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-11 min-h-0 px-4">
                        <Send className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
