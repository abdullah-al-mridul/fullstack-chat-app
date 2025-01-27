import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { daisyuiThemes } from "../constants/themes";
import { Send } from "lucide-react";

const previewMessages = [
  {
    id: 1,
    content: " Hey, how are you?",
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
    <div className="min-h-screen container mx-auto px-4 py-12 max-w-5xl">
      <div className="space-y-8">
        {/* Theme Section */}
        <section className="rounded-2xl border border-base-300 p-6 bg-base-100">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Appearance
            </h2>
            <p className="text-sm text-base-content/70">
              Customize the look and feel of your chat interface with different
              themes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {daisyuiThemes.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                  t === theme
                    ? "bg-base-200 ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                    : "hover:bg-base-200/50"
                }`}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-12 w-full rounded-lg overflow-hidden shadow-sm"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-xs font-medium truncate w-full text-center">
                  {t}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Preview Section */}
        <section className="rounded-2xl border border-base-300 p-6 bg-base-100">
          <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-200 shadow-lg">
            <div className="p-6">
              <div className="max-w-lg mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-base-100 rounded-xl shadow-md overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium">John Doe</h3>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-success"></div>
                          <p className="text-xs text-base-content/70">Online</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[240px] max-h-[240px] overflow-y-auto bg-base-100">
                    {previewMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-2xl p-3.5 shadow-sm
                            ${
                              message.isSent
                                ? "bg-primary text-primary-content"
                                : "bg-base-200"
                            }
                          `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                              text-[10px] mt-1.5
                              ${
                                message.isSent
                                  ? "text-primary-content/70"
                                  : "text-base-content/70"
                              }
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-11"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-11 min-h-0 px-4">
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
