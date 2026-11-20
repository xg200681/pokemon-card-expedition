using System;
using System.IO;
using System.Diagnostics;
using System.Windows.Forms;

namespace PokemonCardGame
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            try
            {
                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string htmlPath = Path.Combine(baseDir, "index.html");

                if (!File.Exists(htmlPath))
                {
                    MessageBox.Show("未找到游戏主文件: index.html\n请确保它与此程序位于同一文件夹内。", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }

                // 候选独立窗口浏览器路径 (Edge 或 Chrome)
                string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                string progFiles = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
                string progFilesX86 = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86);

                string[] candidatePaths = new string[]
                {
                    Path.Combine(progFilesX86, @"Microsoft\Edge\Application\msedge.exe"),
                    Path.Combine(progFiles, @"Microsoft\Edge\Application\msedge.exe"),
                    Path.Combine(localAppData, @"Microsoft\Edge\Application\msedge.exe"),
                    Path.Combine(progFiles, @"Google\Chrome\Application\chrome.exe"),
                    Path.Combine(progFilesX86, @"Google\Chrome\Application\chrome.exe"),
                    Path.Combine(localAppData, @"Google\Chrome\Application\chrome.exe")
                };

                string browserExe = null;
                foreach (string path in candidatePaths)
                {
                    if (File.Exists(path))
                    {
                        browserExe = path;
                        break;
                    }
                }

                string fileUri = new Uri(htmlPath).AbsoluteUri;

                if (!string.IsNullOrEmpty(browserExe))
                {
                    // 以专属独立客户端窗口启动：隐藏多余的地址栏、标签页、书签栏，固定优雅尺寸
                    ProcessStartInfo psi = new ProcessStartInfo();
                    psi.FileName = browserExe;
                    psi.Arguments = string.Format("--app=\"{0}\" --window-size=1120,840 --allow-file-access-from-files", fileUri);
                    psi.UseShellExecute = false;
                    Process.Start(psi);
                }
                else
                {
                    // 降级为系统默认打开
                    Process.Start(new ProcessStartInfo(fileUri) { UseShellExecute = true });
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("启动游戏时出错: " + ex.Message, "启动失败", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
